const core = require("@actions/core");
const github = require("@actions/github");
const axios = require('axios');

try {
  const time = new Date().toTimeString();
  const webhook = core.getInput("webhook", { required: true });
  const notificationType = core.getInput("tag-or-release", { required: true });
  const releaseNotes = core.getInput("release-notes", { required: true });
  const version = core.getInput("version", { required: true });
  const environment = core.getInput("environment", { required: true });
  const actionUrl = core.getInput("action-url", { required: true });
  const applicationName = core.getInput("application-name", { required: true });

  if (notificationType !== "tag" && notificationType !== "release") {
    throw new Error("Invalid notification type. Please provide either 'tag' or 'release'");
  }

  if (environment !== "production" && environment !== "development") {
    throw new Error("Invalid environment. Please provide either 'production' or 'development'");
  }

  const payload = {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        contentUrl: null,
        content: {
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          type: "AdaptiveCard",
          version: "1.6",
          body: [
            {
              type: "TextBlock",
              size: "medium",
              weight: "bolder",
              text: `🚀 New ${notificationType} published`,
              style: "heading",
              wrap: true,
            },
            {
              type: "FactSet",
              facts: [
                {
                  title: "Application",
                  value: applicationName,
                },
                {
                  title: "Version",
                  value: version,
                },
                {
                  title: "Date",
                  value: time,
                },
                {
                  title: "Environment",
                  value: environment,
                },
              ],
            },
            {
              type: "TextBlock",
              weight: "bolder",
              text: `Release notes`,
              wrap: true,
            },
            {
              type: "TextBlock",
              text: releaseNotes,
              wrap: true,
            },
          ],
          actions: [
            {
              type: "Action.OpenUrl",
              title: "View release",
              url: actionUrl,
              role: "button",
            },
          ],
        },
      },
    ],
  };

  axios.post(webhook, payload).then((res) => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  });
} catch (error) {
  core.setFailed(error.message);
}
