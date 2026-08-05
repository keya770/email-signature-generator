import json, re, os

path = r"C:\Users\KEYA\.cursor\projects\c-xampp-htdocs-email-signature-generator\agent-transcripts\215eb895-d6f1-4b27-b366-6f4e45cd7b40\215eb895-d6f1-4b27-b366-6f4e45cd7b40.jsonl"
out = r"c:\xampp\htdocs\email-signature-generator\_d1_snaps"
os.makedirs(out, exist_ok=True)

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

# Pull ALL complete buildComDesignExecutive bodies that have both footerBg gradient AND topBgStyle watermark
results = []
with open(path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        if "buildComDesignExecutive" not in line or "footerBg" not in line:
            continue
        if "topBgStyle" not in line and "url('${bgSrc}')" not in line and 'url("${bgSrc}")' not in line:
            continue
        obj = json.loads(line)
        blob = "\n".join(extract_text(obj))
        # find all function starts
        starts = [m.start() for m in re.finditer(r"function buildComDesignExecutive\(", blob)]
        for si, start in enumerate(starts):
            # end at next function or ===
            end = len(blob)
            for m in ["\nfunction buildComDesignSplit", "\nfunction buildComDesignPlatinum", "\nfunction build", "\n===", "\n/**\n * Design 2"]:
                j = blob.find(m, start + 20)
                if j != -1 and j < end:
                    end = j
            fn = blob[start:end]
            has_grad = "linear-gradient(to right" in fn and "COM_TEAL" in fn
            has_wm = "topBgStyle" in fn or "sig-com-exec-wm" in fn or "url('${bgSrc}')" in fn
            has_accent = "accentW" in fn
            has_colspan_footer = 'colspan="3"' in fn and "footerBg" in fn
            has_split_footer = "footerLeftW" in fn and "footerRightW" in fn
            if has_grad and has_wm and has_accent:
                results.append({
                    "line": i,
                    "idx": si,
                    "len": len(fn),
                    "colspan": has_colspan_footer,
                    "split": has_split_footer,
                    "wm_img": "sig-com-exec-wm" in fn,
                    "fn": fn,
                })

print("Found", len(results), "matching bodies")
for r in results:
    print("L%s#%s len=%s colspan_grad=%s split=%s wm_img=%s" % (r["line"], r["idx"], r["len"], r["colspan"], r["split"], r["wm_img"]))

# Prefer continuous colspan gradient footer (true navy→teal bar)
prefer = [r for r in results if r["colspan"]] or results
# take longest / latest
prefer.sort(key=lambda r: (r["colspan"], r["wm_img"], r["len"], r["line"]))
best = prefer[-1]
dest = os.path.join(out, "best_match.js")
with open(dest, "w", encoding="utf-8") as wf:
    wf.write(best["fn"])
print("BEST L%s#%s -> %s" % (best["line"], best["idx"], dest))

# Also save all colspan versions
for r in results:
    if r["colspan"]:
        p = os.path.join(out, "grad_colspan_L%s_%s.js" % (r["line"], r["idx"]))
        with open(p, "w", encoding="utf-8") as wf:
            wf.write(r["fn"])
        print("saved", p, "len", r["len"])
