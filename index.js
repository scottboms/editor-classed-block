/**
 * This is an example of a block that extends
 * an existing one. The best block to extend
 * is the paragraph.
 */
editor.block("classed-block", {
  // extends: "paragraph",

  // will appear as title in the blocks dropdown
  label: "Classed Element",

  // allow line breaks within the content
  // breaks: true,

  // icon for the blocks dropdown
  icon: "code",

  props: {
    breaks: true,
    content: String,
    attrs: [Array, Object]
  },

  computed: {
    fields() {
      return {
        css: {
          label: this.$t("editor.blocks.image.css.label"),
          type: "text",
          icon: "code"
        },
        element: {
          label: "HTML Element",
          type: "select",
          default: "div",
          options: [{
            value: "aside",
            text: "aside"
          }, {
            value: "div",
            text: "div"
          }, {
            value: "footer",
            text: "footer"
          }, {
            value: "header",
            text: "header"
          }, {
            value: "section",
            text: "section"
          }, {
            value: "span",
            text: "span"
          }],
          icon: "code"
        }
      };
    }
  },

  methods: {
    focus(cursor) {
      this.$refs.input.focus(cursor);
    },
    onBack(event) {
      this.$emit("back", event);
    },
    onCheck() {
      this.$emit("input", {
        attrs: {
          done: !this.attrs.done
        }
      });
    },
    onEnter() {
      if(this.content.length === 0) {
        this.$emit("convert", "paragraph");
      } else {
        this.$emit("append", {
          type: "classed-block"
        });
      }
    },
    onInput(html) {
      this.$emit("input", {
        content: html
      });
    },
    onNext(cursor) {
      this.$emit("next", cursor);
    },
    onPrev(cursor) {
      this.$emit("prev", cursor);
    },
    onSplit(data) {
      this.$emit("split", data);
    },
    
    saveSettings() {
      this.$refs.settings.close();
      this.input(this.attrs);
    },
    
    input(data) {
      this.$emit("input", {
        attrs: {
          ...this.attrs,
          ...data
        }
      });
    },
    
    menu() {
      return [
        {
          icon: "cog",
          label: "Classed Block Settings",
          click: this.$refs.settings.open
        }
      ];
    }
  },

  template: `
    <p>
    <span style="font-weight: bold">{{ attrs.title }}</span>
    <k-editable 
    ref="input" 
    :content="content" 
    @back="onBack" 
    @enter="onEnter" 
    @input="onInput" 
    @next="onNext" 
    @prev="onPrev" 
    @split="onSplit"
  />
  <k-dialog ref="settings" @submit="saveSettings" size="medium">
    <k-form :fields="fields" v-model="attrs" @submit="saveSettings" />
  </k-dialog>
  `
});