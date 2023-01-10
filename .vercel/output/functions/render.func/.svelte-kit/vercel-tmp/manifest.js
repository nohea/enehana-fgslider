export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-0c92d60e.js","imports":["_app/immutable/start-0c92d60e.js","_app/immutable/chunks/index-4375fe63.js","_app/immutable/chunks/singletons-28a652aa.js","_app/immutable/chunks/index-845534ea.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/cleanup.json",
				pattern: /^\/api\/cleanup\.json\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/cleanup.json/_server.js')
			},
			{
				id: "/slider",
				pattern: /^\/slider\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
