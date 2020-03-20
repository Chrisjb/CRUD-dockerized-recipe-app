
library(tidyverse)
library(usethis)
library(DBI)
library(RPostgreSQL)
library(tidyverse)
library(geosphere)
#set recipe_db = 'recipedb'

usethis::edit_r_environ()
initConnection <- function(db = Sys.getenv('recipe_db')){
  RPostgreSQL::dbConnect(RPostgreSQL::PostgreSQL(),
                         dbname = db,
                         host = "localhost",
                         user = "postgres")
}


con <- initConnection()
# ensure time is character and we have a primary key
DBI::dbSendQuery(con, 'CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, 
                 name VARCHAR(255), ingredients TEXT, directions TEXT);')

recipe <- data.frame(name = 'KISS Salmon',
           ingredients = '2 (6 ounce) salmon filets, skin o;
           1/4 cup barbeque sauce; 
           1/4 cup seedless raspberry jam',
           directions = '
           Preheat oven to 400 degrees F (200 degrees C).
Grease an 11x7-inch baking dish.
Place the salmon fillets into the prepared baking dish with skin sides down.
Stir the barbeque sauce and raspberry jam together in a small bowl.
Generously brush the mixture over the salmon.
Bake in the preheated oven until the salmon is opaque and flakes easily with a fork, 35 to 40 minutes.
Brush again with the sauce mixture after the first 15 minutes of baking time.
           ')

dbWriteTable(con, 'recipes', recipe, append=T, row.names=F)
