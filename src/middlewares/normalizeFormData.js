export function normalizeFormData(req, _res, next) {
  if (req.body && typeof req.body === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(req.body)) {
      const nk = typeof k === 'string' ? k.trim() : k; 
      const nv = typeof v === 'string' ? v.trim() : v;
      out[nk] = nv;
    }
    req.body = out;
  }
  next();
}
