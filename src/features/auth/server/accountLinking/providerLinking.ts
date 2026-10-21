import {
  UserRepository,
} from "../session";

import type {
  ProviderAccount,
} from "./types";

export class ProviderLinking {

  /**
   * Find provider account.
   */
  static async findProvider(
    provider: string,
    providerAccountId: string
  ) {

    return UserRepository.findProviderAccount(
      provider,
      providerAccountId
    );

  }

  /**
   * Check whether provider
   * is already linked.
   */
  static async isLinked(
    userId: string,
    provider: string
  ): Promise<boolean> {

    return UserRepository.isProviderLinked(

      userId,

      provider

    );

  }

  /**
   * Create provider link.
   */
  static async createProviderLink(
    userId: string,
    account: ProviderAccount
  ) {

    return UserRepository.createProviderLink({

      user: {

        connect: {

          id: userId,

        },

      },

      provider:
        account.provider,

      providerAccountId:
        account.providerAccountId,

      type:
        account.type,

    });

  }

  /**
   * Link provider only
   * if it isn't already linked.
   */
  static async ensureProviderLinked(
    userId: string,
    account: ProviderAccount
  ) {

    const linked =
      await this.isLinked(

        userId,

        account.provider

      );

    if (linked) {

      return;

    }

    return this.createProviderLink(

      userId,

      account

    );

  }

  /**
   * Remove linked provider.
   */
  static async unlinkProvider(
    userId: string,
    provider: string
  ) {

    return UserRepository.unlinkProvider(

      userId,

      provider

    );

  }

}