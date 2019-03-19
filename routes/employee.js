var express = require('express');
var app = express();
var Employee = require('../models/employee');
//list employee
app.get('/', (req, res) => {
    var since = req.query.since || 0;
    since = Number(since);
    Employee.find({})
        .skip(since)
        .limit(30)
        .populate('user')
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Failed to loanding employees',
                        err
                    });
                }
                Employee.count({}, (err, counting) => {
                    res.status(200).json({
                        ok: true,
                        employees,
                        counting
                    });
                });
            }
        )
});
//create employee
app.post('', (req, res) => {
    var body = req.body;
    var employee = new Employee({
        salary: body.salary,
        description: body.description,
        user: body.user
    });
    employee.save((err, employeeSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to create employee',
                err
            });
        }
        res.status(201).json({
            ok: true,
            employeeSave
        });
    });
});
//update employee
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Employee.findByIdAndUpdate(id, body, (err, employee) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to update employee',
                err
            });
        }
        if (!employee) {
            return res.status(400).json({
                ok: false,
                message: 'The id: ' + id + ' does not exist'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'actualizado',
            employee: body
        });

    });
});
//delete employee
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Employee.findByIdAndDelete(id, (err, employeeDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete employee',
                err
            });
        }
        if (!employeeDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no employee'
            });
        }
        res.status(200).json({
            ok: true,
            employeeDelete
        })
    });
});
module.exports = app;