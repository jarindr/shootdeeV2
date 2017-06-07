#!/bin/sh
mongoimport -d shootdee -c equipments --type csv --file ./scripts/equipments.csv --headerline