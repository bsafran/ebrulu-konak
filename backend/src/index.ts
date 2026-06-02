// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Setup API permissions for Public role
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        // Define permissions
        const permissions = [
          { action: 'api::room.room.find', role: publicRole.id },
          { action: 'api::room.room.findOne', role: publicRole.id },
          { action: 'api::restaurant.restaurant.find', role: publicRole.id },
          { action: 'api::restaurant.restaurant.findOne', role: publicRole.id },
          { action: 'api::gallery.gallery.find', role: publicRole.id },
          { action: 'api::gallery.gallery.findOne', role: publicRole.id },
          { action: 'api::site-setting.site-setting.find', role: publicRole.id },
          { action: 'api::reservation.reservation.create', role: publicRole.id },
        ];

        // Set permissions
        for (const perm of permissions) {
          try {
            await strapi.db.query('plugin::users-permissions.permission').upsert({
              where: {
                action: perm.action,
                role: perm.role,
              },
              create: {
                action: perm.action,
                role: perm.role,
                enabled: true,
              },
              update: {
                enabled: true,
              },
            });
          } catch (error) {
            console.log(`Permission ${perm.action} setup skipped.`);
          }
        }

        console.log('✓ API permissions configured for Public role');
      }
    } catch (error) {
      console.log('Permissions setup will be configured manually or in a future run.');
    }
  },
};
