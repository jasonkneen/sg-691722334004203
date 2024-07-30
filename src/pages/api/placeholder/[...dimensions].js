export default function handler(req, res) {
  const { dimensions } = req.query;
  const [width, height] = dimensions;

  // Generate a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#cccccc"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#333333" text-anchor="middle" dy=".3em">${width}x${height}</text>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(svg);
}