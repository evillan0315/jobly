module.exports = {
  apps: [
    {
      name: "jobly",
      script: "yarn start",
      exec_mode: "cluster",
      instances: "max", // Or specify a fixed number of instances
      autorestart: true,
      watch: true, // Watch for file changes and restart automatically
      max_memory_restart: "1G", // Restart if memory usage exceeds 1GB
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
