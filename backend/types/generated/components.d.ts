import type { Schema, Struct } from '@strapi/strapi';

export interface RoomsFeature extends Struct.ComponentSchema {
  collectionName: 'components_rooms_feature';
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'rooms.feature': RoomsFeature;
    }
  }
}
