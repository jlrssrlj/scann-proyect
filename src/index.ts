import app from "./adapters/web/server";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`corriendo en http://localhost:${PORT}`);
});
