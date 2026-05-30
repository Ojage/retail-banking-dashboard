/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@cloudscape-design/components",
    "@cloudscape-design/component-toolkit",
    "@cloudscape-design/global-styles",
    "@cloudscape-design/design-tokens",
    "@cloudscape-design/collection-hooks",
    "@cloudscape-design/chat-components",
    "@cloudscape-design/board-components",
    "rettime",
    "@mswjs/interceptors",
    "@open-draft/deferred-promise",
    "until-async",
  ],
};

module.exports = nextConfig;
