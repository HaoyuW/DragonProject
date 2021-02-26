#!/bin/bash

export PGPASSWORD='node_password'

echo "recreating DB"

dropdb -U node_user dragon
createdb -U node_user dragon

echo "cogfiging DB"

psql -U node_user dragon  < ./bin/sql/account.sql
psql -U node_user dragon  < ./bin/sql/gen.sql
psql -U node_user dragon  < ./bin/sql/dragon.sql
psql -U node_user dragon  < ./bin/sql/trait.sql
psql -U node_user dragon  < ./bin/sql/dragonTrait.sql
psql -U node_user dragon  < ./bin/sql/accountDragon.sql

# echo "inset traits"
node ./bin/insertTraits.js

echo "cogfiging DB finsihed!"