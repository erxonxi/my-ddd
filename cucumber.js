const common = [
  '--publish-quiet',
  '--require-module ts-node/register' // Load TypeScript module
];

const mooc = [
  ...common,
  'tests/apps/mooc/features/**/*.feature',
  '--require tests/apps/mooc/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  mooc
};