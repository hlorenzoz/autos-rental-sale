import * as Sentry from '@sentry/astro';

Sentry.init({
  spotlight: import.meta.env.SENTRY_SPOTLIGHT === '1',
  // Exclude noise from node_modules as per project requirements
  beforeSend(event) {
    const isNodeModules = event.exception?.values?.some((value) =>
      value.stacktrace?.frames?.some((frame) => 
        frame.filename?.includes('node_modules') || 
        frame.filename?.includes('node:')
      )
    );

    if (isNodeModules) {
      return null;
    }

    return event;
  },
});
