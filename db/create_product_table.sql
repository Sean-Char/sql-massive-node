create table if not exists products (
  productId serial primary key,
  name varchar(50),
  description varchar(255),
  price double precision,
  imageurl varchar(255)
)
