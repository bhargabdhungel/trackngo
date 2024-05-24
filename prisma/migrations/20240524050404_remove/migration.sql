-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
CREATE SEQUENCE user_userid_seq;
ALTER TABLE "User" ALTER COLUMN "userId" SET DEFAULT nextval('user_userid_seq');
ALTER SEQUENCE user_userid_seq OWNED BY "User"."userId";
