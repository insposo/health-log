This directory contains localizations extracted from the [GNU Health](http://health.gnu.org/) project. To generate
the translations yourself, extract the [latest gnuhealth distribution](http://ftp.gnu.org/gnu/health/gnuhealth-latest.tar.gz)
here. The `.po` files from the directory `/gnuhealth-<version>/health_icd10/locale/` should go to `gnuhealth/locale`.
Then run `../../convert-po.js`. You should get a new `icd10.json` file with all the localizations. 