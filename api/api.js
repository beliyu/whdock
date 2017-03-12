var express = require('express');
var Dockerode = require('dockerode');
var jsonParser = require('body-parser').json();
var routerApi = express.Router();
var ip = require('ip');

var docker = new Dockerode({ socketPath: '/var/run/docker.sock' });

routerApi.get('/containers', function (req, res) {
  docker.listContainers(
    {
      all: req.query.all ? true : false,
      filters: req.query.filters,
    },

    function (error, data) {
      res.json(
        {
          containers: data,
        }
      );
    }
  );
});

routerApi.get('/containers/:id', function (req, res) {
  var container = docker.getContainer(req.params.id);

  container.inspect(function (error, data) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.json(data);
  });
});

routerApi.post('/containers/:id/actions/start', function (req, res) {
  var container = docker.getContainer(req.params.id);

  container.start(function (error) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.status(204);
    res.send();
  });
});

routerApi.post('/containers/:id/actions/stop', function (req, res) {
  var container = docker.getContainer(req.params.id);

  container.stop(function (error) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.status(204);
    res.send();
  });
});

routerApi.post('/containers/:id/actions/pause', function (req, res) {
  var container = docker.getContainer(req.params.id);

  container.pause(function (error) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.status(204);
    res.send();
  });
});

routerApi.post('/containers/:id/actions/unpause', function (req, res) {
  var container = docker.getContainer(req.params.id);

  container.unpause(function (error) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.status(204);
    res.send();
  });
});

routerApi.delete('/containers/:id', function (req, res) {
  var container = docker.getContainer(req.params.id);

  container.remove(
    {
      force: true,
      v: req.query.keepVolumes ? false : true,
    },

    function (error) {
      if (error) {
        res.status(error.statusCode);
        res.json(error.json);

        return;
      }

      res.status(204);
      res.send();
    }
  );
});

routerApi.get('/images', function (req, res) {
  docker.listImages(function (error, data) {
    res.json(
      {
        images: data,
      }
    );
  });
});

routerApi.get('/images/:id', function (req, res) {
  var image = docker.getImage(req.params.id);

  image.inspect(function (error, data) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.json(data);
  });
});

routerApi.delete('/images/:id', function (req, res) {
  var image = docker.getImage(req.params.id);

  image.remove(
    function (error) {
      if (error) {
        res.status(error.statusCode);
        res.json(error.json);

        return;
      }

      res.status(204);
      res.send();
    }
  );
});

routerApi.post(
  '/images/actions/pull',
  jsonParser,

  function (req, res) {
    var options = req.body;

    pullImage(
      options.name,

      function () {
        res.status(201);
        res.send();
      }
    );
  }
);

routerApi.get('/networks', function (req, res) {
  docker.listNetworks(function (error, data) {
    res.json(
      {
        networks: data,
      }
    );
  });
});

routerApi.get('/networks/:id', function (req, res) {
  var network = docker.getNetwork(req.params.id);

  network.inspect(function (error, data) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.json(data);
  });
});

routerApi.post(
  '/networks',
  jsonParser,

  function (req, res) {
    var options = req.body;

    docker.createNetwork(
      options,

      function (error, data) {
        if (error) {
          res.status(error.statusCode);
          res.json(error.json);
        }

        res.status(201);
        res.send();
      }
    );
  }
);

routerApi.post('/networks/actions/prune', function (req, res) {
  docker.pruneNetworks(function (error, data) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.json(data);
  });
});

routerApi.delete('/networks/:id', function (req, res) {
  var network = docker.getNetwork(req.params.id);

  network.remove(function (error) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.status(204);
    res.send();
  });
});

routerApi.get('/system/whdock', function (req, res) {
  var data = require(__dirname + '/../package.json');

  var result = {
    version: data.version,
  };

  res.json(result);
});

routerApi.get('/system/info', function (req, res) {
  docker.info(function (error, data) {
    res.json(data);
  })
});

routerApi.get('/system/version', function (req, res) {
  docker.version(function (error, data) {
    data.hostip = ip.address();
    res.json(data);
  })
});

routerApi.get('/volumes', function (req, res) {
  docker.listVolumes(function (error, data) {
    res.json(
      {
        volumes: data.Volumes,
      }
    );
  })
});

routerApi.get('/volumes/:id', function (req, res) {
  var volume = docker.getVolume(req.params.id);

  volume.inspect(function (error, data) {
    if (error) {
      res.status(error.statusCode);
      res.json(error.json);

      return;
    }

    res.json(data);
  });
});

routerApi.delete('/volumes/:name', function (req, res) {
  var volume = docker.getVolume(req.params.name);

  volume.remove(
    {
      force: true,
    },

    function (error) {
      if (error) {
        res.status(error.statusCode);
        res.json(error.json);

        return;
      }

      res.status(204);
      res.send();
    }
  );
});

routerApi.post(
  '/volumes',
  jsonParser,

  function (req, res) {
    var options = req.body;

    docker.createVolume(
      options,

      function (error, data) {
        if (error) {
          res.status(error.statusCode);
          res.json(error.json);
        }

        res.status(201);
        res.send();
      }
    );
  }
);


var pullImage = function (image, callback) {
  var auth = null;

  docker.pull(
    image,
    {
      authconfig: auth,
    },

    function (error, stream) {
      docker.modem.followProgress(
        stream,

        function () {
          callback();
        }
      );
    }
  );
}

module.exports = routerApi;