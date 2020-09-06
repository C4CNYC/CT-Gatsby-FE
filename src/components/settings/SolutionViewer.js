import React from 'react';
import PropTypes from 'prop-types';

import Prism from 'prismjs';
import Helmet from 'react-helmet';

import './solution-viewer.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const prismLang = {
  css: 'css',
  js: 'javascript',
  jsx: 'javascript',
  html: 'markup'
};

function SolutionViewer({
  files,
  solution = '// The solution is not available for this project'
}) {
  const solutions =
    files && Array.isArray(files) && files.length ? (
      files.map(file => (
        <Card className='solution-viewer' key={file.ext}>
          <CardHeader title={file.ext.toUpperCase()}></CardHeader>
          <CardContent>
            <pre>
              <code
                className={`language-${prismLang[file.ext]}`}
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(
                    file.contents.trim(),
                    Prism.languages[prismLang[file.ext]]
                  )
                }}
              />
            </pre>
          </CardContent>
        </Card>
      ))
    ) : (
      <Card className='solution-viewer' key={solution.slice(0, 10)}>
        <CardHeader title={'JS'}></CardHeader>
        <CardContent>
          <pre>
            <code
              className='language-markup'
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  solution.trim(),
                  Prism.languages.js,
                  'javascript'
                )
              }}
            />
          </pre>
        </CardContent>
      </Card>
    );
  return (
    <div>
      <Helmet>
        <link href='/css/prism.css' rel='stylesheet' />
      </Helmet>
      {solutions}
    </div>
  );
}

SolutionViewer.displayName = 'SolutionViewer';
SolutionViewer.propTypes = {
  files: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  solution: PropTypes.string
};

export default SolutionViewer;
