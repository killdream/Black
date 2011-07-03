/******************************************************************************
 *                                   ~list~                                   *
 *                                 ‾‾‾‾‾‾‾‾‾‾                                 *
 * Utilities for handling sequence objects (Array and Arraylike)              *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

/// Module list ////////////////////////////////////////////////////////////////
void function (root) { 

    var __old, list

    // Imports
    , type = typeof require != 'undefined'?  require('./type') : black.type

    // Aliases
    , listp   = Array.isArray
    , __slice = Array.prototype.slice
    , __index = Array.prototype.indexOf

    // Typechecking aliases
    , not_nilp    = type.not_nil
    , sliceablep  = type.sliceablep
    , searchablep = type.searchablep


    //// -Misc information about a list and its elements ///////////////////////

    ///// Function size ////////////////////////////////////////////////////////
    //
    //   (list:List) -> Num
    // 
    // Returns the size of a list.
    //
    function size(list) {
        return list? list.length
                   : 0
    }

    ///// Function emptyp //////////////////////////////////////////////////////
    //
    //   (list:List) -> Bool
    // 
    // Checks if a list is empty or not.
    //
    function emptyp(list) {
        return list? !list.length
                   : true
    }

    ///// Function hasp ////////////////////////////////////////////////////////
    //
    //   (list:List, value[, pred]) -> Bool
    // 
    // Checks if a list contains the given value or not.
    // 
    // The comparison is done using the strict equality comparison
    // (`===`), unless a diferent predicate function is given.
    // 
    // The predicate function does not work with `null` values.
    //
    function hasp(list, value, pred) {
        return !list?              false
             : pred?               find_first(list, value, pred) !== null
             : searchablep(list)?  !!~list.indexOf(value)
             :                     !!~__index.call(list, value)
    }



    //// -Acessing individual members //////////////////////////////////////////
    
    ///// Function first ///////////////////////////////////////////////////////
    //
    //   (list:List) ⇒ *mixed*
    // 
    // Returns the first element of the list.
    //
    function first(list) {
        return list? list[0]
                   : null
    }

    ///// Function last ////////////////////////////////////////////////////////
    //
    //   (list:List) ⇒ *mixed*
    // 
    // Returns the last element of the list.
    //
    function last(list) {
        return list? list[list.length - 1]
                   : null
    }

    ///// Function nth /////////////////////////////////////////////////////////
    //
    //   (list:List, index:Num) ⇒ *mixed*
    // 
    // Returns the element at the given index in the list.
    //
    function nth(list, index) {
        return list? list[index]
                   : null
    }

    ///// Function find_first //////////////////////////////////////////////////
    //
    //   (list:List[, pred:Fn][, ctx:Object]) ⇒ *mixed*
    // 
    // Returns the first element of the list to pass the predicate function.
    // 
    // If the predicate is not given, the function will return the first
    // non-null element from the list.
    // 
    // A context may be given as the last argument; if so, the predicate
    // function will be called with the given object as the `[[this]]`.
    //
    function find_first(list, pred, ctx) { var i
        pred = pred || not_nilp
        
        for (i = 0; i < size(list); ++i)
            if (i in list && pred.call(ctx, list[i], i, list))
                return list[i]

        return null
    }

    ///// Function find_last ///////////////////////////////////////////////////
    //
    //   (list:List[, pred:Fn][, ctx:Object]) ⇒ *mixed*
    // 
    // Returns the last element of the list to pass the predicate function.
    // 
    // If the predicate is not given, the function will return the first
    // non-null element from the list.
    // 
    // A context may be given as the last argument; if so, the predicate
    // function will be called with the given object as the `[[this]]`.
    //
    function find_last(list, pred, ctx) { var i
        pred = pred || not_nilp

        for (i = size(list); --i;)
            if (i in list && pred.call(ctx, list[i], i, list))
                return list[i]

        return null
    }


    
    //// -Extracting sections of a list ////////////////////////////////////////

    ///// Function slice ///////////////////////////////////////////////////////
    //
    //   (list:List[, start:Num][, end:Num]) -> List
    // 
    // Extracts a subsection of the list that goes from `start` to `end`.
    // 
    // When `start` is not given, the algorithm assumes the beginning of
    // the list. When `end` is not given, the algorithm assumes the last
    // item of the list.
    // 
    // At any rate, `start` and `end` are included in the resulting
    // sublist.
    // 
    // If negative indexes are passed as either `start` or `end`,
    // they're taken as a the difference from the length of the
    // list. That is, a -1 index means the last element, -2 the one
    // before the last, and so on.
    //
    function slice(list, start, end) {
        return sliceablep(list)?  list.slice(start, end)
                               :  __slice.call(list, start, end)
    }

    ///// Function rest ////////////////////////////////////////////////////////
    //
    //   (list:List) -> List
    // 
    // Returns a new list without the first element.
    //
    function rest(list) {
        return sliceablep(list)?  list.slice(1)
                               :  __slice.call(list, 1)
    }

    ///// Function pop /////////////////////////////////////////////////////////
    //
    //   (list:List) -> List
    // 
    // Returns a new list without the last element.
    //
    function pop(list) {
        return sliceablep(list)?  list.slice(0, -1)
                               :  __slice.call(list, 0, -1)
    }

    ///// Function drop ////////////////////////////////////////////////////////
    //
    //   (list:List, num:Num) -> List
    // 
    // Returns a list without the first `num` elements.
    //
    function drop(list, num) {
        return sliceablep(list)?  list.slice(num + 1)
                               :  __slice.call(list, num + 1)
    }

    ///// Function keep ////////////////////////////////////////////////////////
    //
    //   (list:List, num:Num) -> List
    // 
    // Returns a list with just the first `num` elements.
    //
    function keep(list, num) {
        return sliceablep(list)?  list.slice(0, num - 1)
                               :  __slice.call(list, 0, num - 1)
    }


        


    ///// Exports //////////////////////////////////////////////////////////////
    list = typeof exports == 'undefined'?  root.black.list = { }
                                        :  exports



    list.$black_box   = Array
    list.$black_proto = Array.prototype

}(this)
