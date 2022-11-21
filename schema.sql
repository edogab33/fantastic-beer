CREATE TABLE production (
  quantity int NOT NULL,
  name varchar(50) NOT NULL,
  day date NOT NULL DEFAULT CURRENT_DATE, 
  PRIMARY KEY (name, day)
);

INSERT INTO production (quantity, name, day)
VALUES 
  (2, 'weiss', '2022-01-01'),
  (3, 'pils', '2022-01-01'),
  (0, 'stout', '2022-01-01'),
  (3, 'weiss', '2022-01-02'),
  (3, 'pils', '2022-01-02'),
  (0, 'stout', '2022-01-02'),
  (0, 'weiss', '2022-01-03'),
  (4, 'pils', '2022-01-03'),
  (4, 'stout', '2022-01-03'),
  (5, 'weiss', '2022-01-04'),
  (0, 'pils', '2022-01-04'),
  (1, 'stout', '2022-01-04'),
  (2, 'weiss', '2022-01-05'),
  (2, 'pils', '2022-01-05'),
  (6, 'stout', '2022-01-05'),
  (1, 'stout', '2022-01-06');