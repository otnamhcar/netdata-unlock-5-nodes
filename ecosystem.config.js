module.exports = {
  apps: [
    {
      name: "netdata-patch",
      script: "./main.ts",
      interpreter: "deno",
      interpreterArgs: "run --allow-net --allow-read --allow-env --allow-read=.env",
    },
  ],
};
