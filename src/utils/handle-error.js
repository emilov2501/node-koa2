export class Response {
  /**
   * 
   * @param {Object} ctx // Context of Request and Response
   */
  constructor(ctx) {
    this.ctx = ctx
  }

  sendStatus(statusCode) {
    this.ctx.status = statusCode
    return this;
  }

  sendMessage(message) {
    this.ctx.body = message;
    return this;
  }
};
