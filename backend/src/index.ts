// import type { Core } from '@strapi/strapi';

// Demo data
const demoData = {
  rooms: [
    {
      title: 'Deluxe Suite',
      description: '<p>Lüks süit odamız, dikkatli tasarımı ve zarif dekorasyonuyla misafirlerimize unutulmaz bir deneyim sunmaktadır. Yüksek tavanlar, şık mobilyalar ve modern amenitielarla donatılmıştır.</p>',
      price: 5000,
      maxGuests: 2,
      features: ['WiFi Ücretsiz', 'Klima', 'Çift Kişilik Yatak', 'Özel Banyo', 'Kablo TV', 'Minibar', 'Jakuzi'],
    },
    {
      title: 'Executive Room',
      description: '<p>İş adamları ve seyahat edenler için özel olarak tasarlanan Executive Room\'umuz, çalışma alanı ve rahat yatış alanı sunmaktadır.</p>',
      price: 3500,
      maxGuests: 2,
      features: ['WiFi Hızlı', 'Çalışma Masası', 'Klima', 'Duş', 'Kablo TV', 'Telefon'],
    },
    {
      title: 'Standard Room',
      description: '<p>Konforlu ve ekonomik seçeneğimiz Standard Room, temel amenitieleri içerir ve tüm misafirlerimize memnuniyeti sağlar.</p>',
      price: 2000,
      maxGuests: 2,
      features: ['WiFi', 'Klima', 'Tek veya Çift Yatak', 'Banyo', 'TV'],
    },
    {
      title: 'Presidential Suite',
      description: '<p>Ebrulu Konak\'ın en lüks odası Presidential Suite, iki kat, panoramik görünüm ve özel hizmet sunmaktadır.</p>',
      price: 8000,
      maxGuests: 4,
      features: ['WiFi Ücretsiz', 'Jakuzi', 'Sauna', 'Özel Asistan', 'Gourmet Mini Bar', 'Panoramik Görünüm', 'Ön Bahçe'],
    },
  ],
  restaurants: [
    {
      name: 'Bahar Restaurant',
      description: '<p>Saraç\'ın özel şef tarafından hazırlanan Türk ve uluslararası mutfaktan lezzetli yemekler sunmaktadır. Zarif ortam ve profesyonel servis ile işletme.</p>',
      cuisine: 'Türk & Uluslararası',
      openingHours: '10:00 - 23:00',
    },
    {
      name: 'Fine Dining',
      description: '<p>Michelin yıldızlı şefler tarafından hazırlanan fine dining deneyimi. Yüksek kalite malzemeleri ve yaratıcı sunum ile.</p>',
      cuisine: 'Fusion',
      openingHours: '18:00 - 23:00',
    },
  ],
  galleries: [
    { title: 'Otel Lobisi', category: 'exterior' },
    { title: 'Odalarımız', category: 'rooms' },
    { title: 'Restoranımız', category: 'restaurant' },
    { title: 'Bahçe', category: 'exterior' },
    { title: 'Havuz', category: 'other' },
  ],
  siteSettings: {
    heroTitle: 'Ebrulu Konak\'a Hoş Geldiniz',
    heroSubtitle: 'Lüksün ve Konforun Buluştuğu Yer',
    welcomeTitle: 'Hoş Geldiniz',
    welcomeText: '<p>Ebrulu Konak, Yunak bölgesinin tarihi ve doğal güzellikleri içinde yer alan, modern amenities ile klasik mimarisini harmanlayan benzersiz bir otel işletmesidir.</p>',
    aboutTitle: 'Hakkımızda',
    aboutText: '<p>Ebrulu Konak, Yunak bölgesinin en lüks ve konforlu otel hizmetini sunmaktan gurur duyar.</p>',
    contactEmail: 'info@ebrulukonak.com',
    contactPhone: '+90 (555) 123-4567',
    address: 'Yunak, Afyonkarahisar, Türkiye',
  },
};

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

    // Seed demo data
    try {
      console.log('🌱 Checking for existing demo data...');

      // Check if rooms already exist
      const existingRooms = await strapi.entityService.findMany('api::room.room');

      if (existingRooms && existingRooms.length > 0) {
        console.log('✓ Demo data already exists, skipping seed');
        return;
      }

      console.log('📍 Seeding rooms...');
      for (const room of demoData.rooms) {
        try {
          await strapi.entityService.create('api::room.room', {
            data: { ...room, publishedAt: new Date() },
          });
          console.log(`   ✓ ${room.title}`);
        } catch (error) {
          console.log(`   ✗ ${room.title}: ${error.message}`);
        }
      }

      console.log('🍽️  Seeding restaurants...');
      for (const restaurant of demoData.restaurants) {
        try {
          await strapi.entityService.create('api::restaurant.restaurant', {
            data: { ...restaurant, publishedAt: new Date() },
          });
          console.log(`   ✓ ${restaurant.name}`);
        } catch (error) {
          console.log(`   ✗ ${restaurant.name}: ${error.message}`);
        }
      }

      console.log('📷 Seeding gallery...');
      for (const gallery of demoData.galleries) {
        try {
          await strapi.entityService.create('api::gallery.gallery', {
            data: { ...gallery, publishedAt: new Date() },
          });
          console.log(`   ✓ ${gallery.title}`);
        } catch (error) {
          console.log(`   ✗ ${gallery.title}: ${error.message}`);
        }
      }

      console.log('⚙️  Seeding site settings...');
      try {
        const existing = await strapi.entityService.findMany('api::site-setting.site-setting');
        if (!existing || existing.length === 0) {
          await strapi.entityService.create('api::site-setting.site-setting', {
            data: demoData.siteSettings,
          });
          console.log('   ✓ Site settings created');
        } else {
          await strapi.entityService.update('api::site-setting.site-setting', existing[0].id, {
            data: demoData.siteSettings,
          });
          console.log('   ✓ Site settings updated');
        }
      } catch (error) {
        console.log(`   ✗ Site settings: ${error.message}`);
      }

      console.log('\n✨ Demo data seeding completed!\n');
    } catch (error) {
      console.log('Seeding skipped:', error.message);
    }
  },
};
