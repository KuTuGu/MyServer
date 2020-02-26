<template>
  <div>
    <!-- <div class="mask"></div> -->
    <textarea ref="editor"></textarea>
  </div>
</template>

<script>
// editor
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/vue/vue'
// hint
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
// fold
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/brace-fold.js'
// search
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.css'
// brackets
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/closetag.js'
import 'codemirror/addon/edit/matchtags.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/continuelist.js'
import 'codemirror/addon/edit/trailingspace.js'
// fullscreen
import 'codemirror/addon/display/autorefresh.js'
import 'codemirror/addon/display/fullscreen.js'
import 'codemirror/addon/display/fullscreen.css'
// theme
import 'codemirror/theme/lesser-dark.css';

export default {
  name: 'Code',
  data(){
    return {
      editor: null,
      value: "",
      skipNextChangeEvent: false,
      options: {
        mode: 'vue',
        theme: 'lesser-dark',
        tabSize: 2,
        cursorHeight: 0.8,
        autofocus: true,
        lineNumbers: true,
        lint: {
          async: true,
          javascript: true
        },
        selfContain: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        autoRefresh: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        fullScreen: true,
        extraKeys: {'Tab': 'autocomplete'},
      }
    }
  },
  ready() {
    this.initEditor();
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor(){
      const path = this.$route.path.slice(1),
            _this = this;
      path;
      this.editor = CodeMirror.fromTextArea(this.$refs.editor, this.options)
      this.editor.setValue(this.value)
      this.editor.on('change', function(cm) {
        if (_this.skipNextChangeEvent) {
          _this.skipNextChangeEvent = false
          return
        }
        if (_this.$emit) {
          _this.$emit('change', cm.getValue())
          _this.$emit('input', cm.getValue())
        }
      })
    }
  },
  watch: {
    'value': newVal => {
      let editorValue = this.editor.getValue()
      if (newVal !== editorValue) {
        this.skipNextChangeEvent = true
        let scrollInfo = this.editor.getScrollInfo()
        this.editor.setValue(newVal)
        this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
      }
    },
    'options': newOptions => {
      if (typeof newOptions === 'object') {
        for (let optionName in newOptions) {
          this.editor.setOption(optionName, newOptions[optionName])
        }
      }
    }
  },
  beforeDestroy() {
    this.editor.toTextArea()
  }
}
</script>

<style>
.CodeMirror{
  position: absolute;
  font-family: Recursive, Fira Code, Consolas;
  font-size: 14px;
  color: #2c3e50;
}
.CodeMirror-line{
  height: 22px;
}
</style>
