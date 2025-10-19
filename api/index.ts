import app from './src/app';

const PORT = process.env.PORT || 3000;

// app.listen(3000, '0.0.0.0', () => {
//   console.log(`Server running on http://0.0.0.0:${PORT}`);
// });

app.listen(3000, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

