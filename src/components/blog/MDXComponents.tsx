import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="text-3xl font-bold text-text mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold text-text mt-8 mb-3" {...props} />,
  h3: (props) => <h3 className="text-xl font-bold text-text mt-6 mb-2" {...props} />,
  p: (props) => <p className="text-text-mid leading-relaxed mb-4" {...props} />,
  a: (props) => <a className="text-green hover:underline" {...props} />,
  ul: (props) => <ul className="list-disc list-inside space-y-1 mb-4 text-text-mid" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside space-y-1 mb-4 text-text-mid" {...props} />,
  li: (props) => <li className="text-text-mid" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-green bg-green/5 rounded-r-lg p-4 my-6 text-text-mid italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono text-sm bg-bg-flow px-1.5 py-0.5 rounded text-green"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-bg-flow border border-border rounded-xl p-4 overflow-x-auto my-6 text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="border-border my-8" />,
  strong: (props) => <strong className="text-text font-semibold" {...props} />,
}
