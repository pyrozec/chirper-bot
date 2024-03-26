const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 4001, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.get('/answer', (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  let conferenceId = req.query.conference_id;

  const ncco = [
    {
      action: 'talk',
      voiceName: 'Jennifer',
      text: 'Welcome to your Nexmo powered conference call, ' + conferenceId.substr(-4),
      language: 'en-US',
      style: 2,
      bargeIn: false
    },
    {
      action: 'conversation',
      name: conferenceId
    },
    {
      action: 'talk',
      text: 'Press 1, for maybe, and 2, for not sure, followed by the hash key.',
      language: 'en-US',
      style: 2,
      bargeIn: true
    },
    {
      action: 'input',
      type: [
          'dtmf'
        ],
        dtmf: {
            submitOnHash: true,
            timeOut: 10
        }
    },
    {
      action: 'talk',
      text: 'Thanks for your input, goodbye.',
      language: 'en-US',
      style: 2
    }
  ];

  res.json(ncco);
});

app.post('/event', (req, res) => {
  console.log(req.body);
  res.status(204).end();
});
