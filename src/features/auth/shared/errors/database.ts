export class DatabaseError extends Error {

  constructor(message: string) {

    super(message);

    this.name = "DatabaseError";

  }

}

export const DATABASE_ERRORS = {

  CREATE_FAILED:
    "Unable to create record.",

  UPDATE_FAILED:
    "Unable to update record.",

  DELETE_FAILED:
    "Unable to delete record.",

  FETCH_FAILED:
    "Unable to fetch record.",

};