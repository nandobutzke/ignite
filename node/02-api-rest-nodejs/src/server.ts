import { env } from './env'
import { app } from './app'

const PORT = env.PORT || 3333;

app.listen({
  host: '0.0.0.0',
  port: PORT
}).then(() => {
  console.log(`HTTP Server running on port ${PORT}`);
});