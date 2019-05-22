import React, { lazy, Suspense } from 'react';
import withContext from '../../../context/Context_HOC';
import { RowWrapper, EditorWrapper } from '../../../styles/Form.js';
//import isMobile from '../../../utils/utils';
const MonacoEditor = lazy(() => import('react-monaco-editor'));

export default withContext(function({ code, onEditorChange, context }) {
   const options = {
      selectOnLineNumbers: true
   };
   /* TODO - rozwiazanie z podaniem window.innerWidth nie jest dynamiczne, wiec podaje hard coded value*/
   const props = {
      width: context.isMobile ? 300 : ''
   };
   return (
      <Suspense
         fallback={
            <div
               style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: '20px 0'
               }}
            >
               Edytor kodu się ładuje...
            </div>
         }
      >
         <RowWrapper>
            <h3>Wklej kod rozwiązania</h3>
            <p>
               Tu wklej cały kod funkcji, wraz z funkcją Main. W Main należy
               zademonstrować działanie funkcji na przykładowych zestawach testowych.
            </p>
            <EditorWrapper>
               <MonacoEditor
                  {...props}
                  language="csharp"
                  theme="vs-dark"
                  value={code}
                  options={options}
                  onChange={onEditorChange}
                  //editorDidMount={this.editorDidMount}
               />
            </EditorWrapper>
         </RowWrapper>
      </Suspense>
   );
});
