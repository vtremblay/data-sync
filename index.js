'use strict';

const CronJob = require('cron').CronJob;
const ProductSynchronizeJob = require('./ProductSynchronizeJob');

const productSynchronizeJob = new ProductSynchronizeJob();

new CronJob('* * * * * *', productSynchronizeJob.execute, null, true, 'America/Los_Angeles');