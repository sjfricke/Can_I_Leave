// Create the vertex, color and index data for an object
// Forest is built once only
function createForest(gl, forest, data) {
    
    // Create and store data into vertex buffer
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.vertex, gl.STREAM_DRAW);
    
    var normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.normal, gl.STREAM_DRAW);

    var texture_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texture_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.texture, gl.STREAM_DRAW);

    var index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.index, gl.STREAM_DRAW);
    
    // unbind buffer because its good for long term dental health
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); 
    
    forest.vertex_buffer = vertex_buffer;         
    forest.texture_buffer = texture_buffer;
    forest.index_buffer = index_buffer;
    forest.normal_buffer = normal_buffer;
    forest.vertex_size = 3;
    forest.normal_size = 3;
    forest.texture_Size = 2;
    forest.index_length = data.index.length;
    forest.vertex_length = data.vertex.length;
    forest.primtype = gl.TRIANGLES;    
    
}

var data_forest = {
    vertex : null,
    normal: null,
    texture : null,
    index : null
}

var forest = {
    vertex_buffer: null,         
    texture_buffer: null, 
    index_buffer: null,
    vertex_size: -1,
    normal_size: -1, 
    texture_size: -1, 
    index_length: -1, 
    vertex_length : -1,
    primtype: null
};

$.get("/api/model/forest", function(result){
    data_forest.vertex = new Float32Array(result.vertex);
    data_forest.normal = new Float32Array(result.normal);
    data_forest.texture = new Float32Array(result.texture);
    data_forest.index = new Uint16Array(result.index);

    createForest(gl, forest, data_forest);
});


