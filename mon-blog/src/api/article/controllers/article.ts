// src/api/article/controllers/article.ts
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: { coverImage: true },
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: { coverImage: true },
    };

    return await super.findOne(ctx);
  },
}));