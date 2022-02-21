SET search_path TO world;

-- Table: Island ------------------------
DELETE FROM island;
INSERT INTO island (island_id, name) VALUES
( 1, 'Tenerife' ),
( 2, 'Gran Canaria' );


-- Table: Hotel ------------------------
DELETE FROM hotel;
INSERT INTO hotel (hotel_id, island_id, name, capacity) VALUES
( 11, 1, 'Sunflower', 10 ),
( 12, 1, 'Ocean View', 120 ),
( 21, 2, 'Plaja', 210 ),
( 22, 2, 'Buena Vista', 220 );
