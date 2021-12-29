const imageHandlerPut = (db) => (req, res) => {
  const { id } = req.body;

  db('users')
    .where('id', '=', id)
    .increment('rank', 1)
    .returning('rank')
    .then((ranks) => {
      if (ranks.length) {
        res.status(200).json(ranks[0]);
      } else {
        res.status(400).json('Unable to get rank');
      }
    })
    .catch(() => {
      res.status(500).json('some server error');
    });
};

const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key 7d05127f3d9245928e5a1e8cd4922179');

const imageHandlerPost = () => (req, res) => {
  stub.PostModelOutputs(
    {
      model_id: 'f76196b43bbd45c99b4f3cd8e8b40a8a',
      inputs: [{ data: { image: { url: req.body.input } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        res.status(400).json('Error: ' + err);
        return;
      }

      if (response.status.code !== 10000) {
        res
          .status(400)
          .json(
            'Received failed status: ' +
              response.status.description +
              '\n' +
              response.status.details
          );
        return;
      }

      res.status(200).json(response);
    }
  );
};

module.exports = {
  imageHandlerPut,
  imageHandlerPost,
};
