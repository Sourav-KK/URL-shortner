import ShortUniqueId from "short-unique-id";

const create_UUID: () => string = () => {
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const random = randomUUID();

  return random;
};

export default create_UUID;
