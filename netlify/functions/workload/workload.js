const os = require("os");

exports.handler = async function workload(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405
    };
  }

  try {
    let load1min = os.loadavg()[0];

    let time = new Date();

    return {
      statusCode: 200,
      body: JSON.stringify({ load: load1min, time }),
      headers: { "Content-type": "application/json" }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ type: err.name, message: err.message })
    };
  }
};
