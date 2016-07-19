'use strict';

const config = require('config');

const CronJob = require('cron').CronJob;
const ProductSynchronizationJob = require('./product/product-synchronization-job');

const productSynchronizationJob = new ProductSynchronizationJob(config.get('product'));

new CronJob('* * * * * *', () => productSynchronizationJob.execute(), null, true, 'America/Los_Angeles');