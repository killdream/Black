/*****************************************************************************
 *                              ~b.lack.object~                              *
 *                            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                            *
 * Provides missing functionality for JavaScript vanilla Objects.            *
 *                                                                           *
 *     ________________________________________________________________      *
 *       Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 *****************************************************************************/


(function (root) {

	// Get the fallback function
	if (typeof exports != "undefined")
		fallback = require('./core').fallback
	else
		fallback = b.lack.fallback


	// Error message, variables, alias and such
	var EObjExpected = "Object prototype may only be an Object or null"
	  , ENonObjProto = "Object.getPrototypeOf called on non-object"

	  , has_proto    = typeof "".__proto__ == "object"
	  , fallback



	///// Function `create` //////////////////////////////////////////////////
	//
	//     create(Obj:proto[, Obj:props]) → Obj
	//
	// Creates a new Object with the specified [[Prototype]] and properties.
	//
	function create(proto, props) {
		if (typeof proto != "object") throw new TypeError(EObjExpected)

		var Empty = function(){ }
		  , obj, prop

		Empty.prototype = proto
		obj             = new Empty
		for (prop in props)
			if (obj.hasOwnProperty(prop)) obj[prop] = props[prop]

		return obj
	}


	///// Function `getPrototypeOf` //////////////////////////////////////////
	//
	//     getPrototypeOf(Obj:obj) → Obj
	//
	// Returns the [[Prototype]] of the specified object.
	//
	// Kinda stolen from John Resig's blog :3
	// http://ejohn.org/blog/objectgetprototypeof/
	//
	function get_proto(obj) {
		if (typeof obj != "object") throw new ENonObjProto

		if (has_proto) return object.__proto__
		else           return object.constructor.prototype
	}


	///// Function `keys` ////////////////////////////////////////////////////
	//
	//     keys(Obj:obj) → Array
	//
	// Returns an array of all **own** enumerable properties found upon
	// a given object, in the same order as that provided by a for-in
	// loop.
	//
	// > This doesn't list the properties found on the prototype chain,
	// > as the for-in loop does.
	//
	function keys(obj) {
		var rv = []
		  , prop

		for (prop in obj)
			if (obj.hasOwnProperty(prop)) rv.push(prop)

		return rv
	}


	///// Provides the fallbacks /////////////////////////////////////////////
	fallback(Object, { create:         create
	                 , getPrototypeOf: get_proto
	                 , keys:           keys })
})(this)
