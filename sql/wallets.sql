create table wallets(
  user_id SERIAL primary key,
  address varchar(255),
  privateKey varchar(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
