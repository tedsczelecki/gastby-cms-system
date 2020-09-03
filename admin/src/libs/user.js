import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-bottts-sprites";

const avatars = new Avatars(sprites());

export const getAvatar = ({ email }) =>  avatars.create(email);
