export const tap = (label) => (req, _res, next) => {
  console.log(`\n--- ${label} ---`);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('KEYS:', Object.keys(req.body || {}));
  console.log('BODY:', req.body);
  next();
};
