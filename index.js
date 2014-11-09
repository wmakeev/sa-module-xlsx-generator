var xlsx = require('node-xlsx')
  , pkg = require('./package');

var _
  , log;

/**
 * Xlsx generation module
 *
 * @param {Object} sb Sandbox
 */
var xlsxGeneratorModule = function (sb) {
    _     = sb._; // link to lodash lib.
    log   = sb.log;

    return {

        init: function (options, done) {
            sb.on('generate/file/xlsx', function (e, channel, next) {
                // check version pkg._eventVersion

                if (!e.workbook)
                    return next(new Error (channel + ': Workbook e not defined'));

                if (!e.workbook.sheets || !e.workbook.sheets.length)
                    return next(new Error (channel + ': Worksheets e not defined'));

                var xlsxData = _.map(e.workbook.sheets, function (sheet, index) {
                    return {
                        name: sheet.name || 'Sheet' + index,
                        data: sheet.rows || []
                    }
                });

                var buffer;
                try {
                    buffer = xlsx.build(xlsxData);

                } catch (err) {
                    return next(err);
                }

                var emmitData = new sb.Events.Buffer(buffer);

                var emmitData = {
                    _name   : pkg.name,
                    type    : 'buffer',
                    buffer  : buffer
                    workbook: e.workbook,
                };

                if (e._eventId) emmitData._srcEventId = e._eventId;
                if (pkg._emmitVersion) emmitData._ver = pkg._emmitVersion;

                sb.emmit('generated/file/xlsx', emmitData, next);
            });

            done();
        },

        destroy: function(done){
            // none
            done();
        }
    };
};

module.exports = xlsxGeneratorModule;
