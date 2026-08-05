import json
import sys

path = r"C:\Users\KEYA\.cursor\projects\c-xampp-htdocs-email-signature-generator\agent-transcripts\215eb895-d6f1-4b27-b366-6f4e45cd7b40\215eb895-d6f1-4b27-b366-6f4e45cd7b40.jsonl"
out = r"c:\xampp\htdocs\email-signature-generator\_d1_snaps"

def extract_text(obj):
    texts = []
    if isinstance(obj, dict):
        if "text" in obj and isinstance(obj["text"], str):
            texts.append(obj["text"])
        if "input" in obj and isinstance(obj["input"], dict):
            inp = obj["input"]
            for k in ("new_string", "old_string", "contents", "command"):
                if k in inp and isinstance(inp[k], str):
                    texts.append("=== " + k + " ===\n" + inp[k])
        for v in obj.values():
            if isinstance(v, (dict, list)):
                texts.extend(extract_text(v))
    elif isinstance(obj, list):
        for item in obj:
            texts.extend(extract_text(item))
    return texts

mode = sys.argv[1] if len(sys.argv) > 1 else "scan"

if mode == "scan":
    targets = {1243, 1259, 1261, 1270, 1279, 1326, 1353, 1361, 1571, 1595, 1649, 1656, 1669, 1673, 1688, 1701, 1710, 1732, 1763, 1773, 1780, 1801, 1802, 1866, 1867, 1884, 1901, 1904, 1905, 1907}
    with open(path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            if i not in targets:
                continue
            obj = json.loads(line)
            blob = "\n".join(extract_text(obj))
            has_fn = "function buildComDesignExecutive" in blob
            has_bg = ("signature-design-background" in blob) or ("design1-bg-bull" in blob) or ("DESIGN1_BG" in blob)
            has_grad = ("linear-gradient" in blob) and (("0B1F3A" in blob) or ("COM_NAVY" in blob))
            has_kal = "kal" in blob.lower()
            role = obj.get("role", "?")
            print("L%s role=%s has_fn=%s has_bg=%s has_grad=%s has_kal=%s blob_len=%s" % (i, role, has_fn, has_bg, has_grad, has_kal, len(blob)))
            if has_kal:
                print("KAL:", blob[:2000].replace("\n", " | "))
                print("---")
            if has_fn and has_bg:
                idx = blob.find("function buildComDesignExecutive")
                print("FN_START:", blob[idx:idx+600].replace("\n", " | "))
                print("---")

elif mode == "dump":
    import os
    os.makedirs(out, exist_ok=True)
    line_no = int(sys.argv[2])
    with open(path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            if i == line_no:
                obj = json.loads(line)
                blob = "\n".join(extract_text(obj))
                dest = os.path.join(out, "L%s.txt" % line_no)
                with open(dest, "w", encoding="utf-8") as wf:
                    wf.write(blob)
                print("Wrote", dest, "len", len(blob))
                # Also extract just the function if present
                if "function buildComDesignExecutive" in blob:
                    idx = blob.find("function buildComDesignExecutive")
                    # find end: next function or end of new_string
                    end_markers = [
                        "\nfunction buildComDesign",
                        "\nfunction build",
                        "\n/**\n * Design 2",
                        "\n==="
                    ]
                    end = len(blob)
                    for m in end_markers:
                        j = blob.find(m, idx + 10)
                        if j != -1 and j < end:
                            end = j
                    fn = blob[idx:end]
                    fndest = os.path.join(out, "fn_L%s.js" % line_no)
                    with open(fndest, "w", encoding="utf-8") as wf:
                        wf.write(fn)
                    print("Wrote", fndest, "len", len(fn))
                break

elif mode == "find_best":
    # Scan ALL lines for function buildComDesignExecutive that also has bg watermark
    results = []
    with open(path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            if "buildComDesignExecutive" not in line:
                continue
            obj = json.loads(line)
            blob = "\n".join(extract_text(obj))
            if "function buildComDesignExecutive" not in blob:
                continue
            # score features
            features = {
                "bg_file": "signature-design-background" in blob or "DESIGN1_BG_FILE" in blob,
                "bull": "design1-bg-bull" in blob,
                "gradient": "linear-gradient" in blob and ("to right" in blob or "COM_TEAL" in blob),
                "watermark": "watermark" in blob.lower() or "background-image" in blob and "url(" in blob,
                "bg_url": "design1BgDataUrl" in blob or "bgSrc" in blob or "DESIGN1_BG" in blob,
                "accent": "accentW" in blob or "COM_TEAL" in blob,
                "trade_better": "TRADE BETTER" in blob or "Trade Better" in blob,
                "disclaimer": "disclaimer" in blob.lower(),
            }
            idx = blob.find("function buildComDesignExecutive")
            # measure function length
            end = len(blob)
            for m in ["\nfunction buildComDesignSplit", "\nfunction buildComDesignPlatinum", "\n/**\n * Design 2", "\n==="]:
                j = blob.find(m, idx + 10)
                if j != -1 and j < end:
                    end = j
            fn_len = end - idx
            score = sum(1 for v in features.values() if v)
            results.append((i, score, fn_len, features, obj.get("role","?")))
    results.sort(key=lambda x: (-x[1], -x[2], -x[0]))
    for r in results[:40]:
        print("L%s score=%s fn_len=%s role=%s feats=%s" % (r[0], r[1], r[2], r[4], r[3]))
