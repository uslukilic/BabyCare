export default function handler(req, res) {
  const users = [
    { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@site.com' },
  ];

  res.status(200).json({ users });
}
