var v = require('../')
  , Vec3 = v.Vec3
  , assert = require('assert')

describe("v()", function() {
  it("no args", function() {
    var v1 = v();
    assert.strictEqual(v1.x, 0);
    assert.strictEqual(v1.y, 0);
    assert.strictEqual(v1.z, 0);
  });
  it("x, y, z", function() {
    var v1 = v(-1, 5, 10.10);
    assert.strictEqual(v1.x, -1);
    assert.strictEqual(v1.y, 5);
    assert.strictEqual(v1.z, 10.10);
  });
  it("array", function() {
    var v1 = v([4, 5, 6]);
    assert.strictEqual(v1.x, 4);
    assert.strictEqual(v1.y, 5);
    assert.strictEqual(v1.z, 6);
  });
  it("object", function() {
    var v1 = v({x: 9, y: 8, z: 7});
    assert.strictEqual(v1.x, 9);
    assert.strictEqual(v1.y, 8);
    assert.strictEqual(v1.z, 7);
  });
  it("string coords", function() {
    var v1 = v("1", "1.5", "-30.2");
    assert.strictEqual(v1.x, 1);
    assert.strictEqual(v1.y, 1.5);
    assert.strictEqual(v1.z, -30.2);
  });
  it("deserialize", function() {
    var v1 = v(v(1, -3.5, 0).toString());
    assert.strictEqual(v1.x, 1);
    assert.strictEqual(v1.y, -3.5);
    assert.strictEqual(v1.z, 0);
    var v2 = v(v(-111, 222, 9876543210.123456789).toString());
    assert.strictEqual(v2.x, -111);
    assert.strictEqual(v2.y, 222);
    assert.strictEqual(v2.z, 9876543210.123456789);
  });
  it("invalid deserialize", function() {
    assert.throws(function() {
      return v("lol hax");
    }, /cannot parse/);
  });
});
describe("vec3", function() {
  it("floored", function() {
    var v1 = new Vec3(1.1, -1.5, 1.9);
    var v2 = v1.floored();
    v1.x = 10;
    assert.strictEqual(v2.x, 1);
    assert.strictEqual(v2.y, -2);
    assert.strictEqual(v2.z, 1);
  });
  it("floor", function() {
    var v1 = new Vec3(1.1, -1.5, 1.9);
    var v2 = v1.floor();
    assert.strictEqual(v2, v1);
    assert.strictEqual(v1.x, 1);
    assert.strictEqual(v1.y, -2);
    assert.strictEqual(v1.z, 1);
  });
  it("offset", function() {
    var v1 = new Vec3(1, 2, 3);
    var v2 = v1.offset(10, -10, 20);
    v1.x = -100;
    assert.strictEqual(v2.x, 11);
    assert.strictEqual(v2.y, -8);
    assert.strictEqual(v2.z, 23);
  });
  it("translate", function() {
    var v1 = new Vec3(1, 2, 3);
    v1.translate(10, -10, 20);
    assert.strictEqual(v1.x, 11);
    assert.strictEqual(v1.y, -8);
    assert.strictEqual(v1.z, 23);
  });
  it("plus", function() {
    var v1 = new Vec3(1, 2, 3);
    var v2 = new Vec3(-1, 0, 1);
    var v3 = v1.plus(v2);
    assert.strictEqual(v1.x, 1);
    assert.strictEqual(v1.y, 2);
    assert.strictEqual(v1.z, 3);
    assert.strictEqual(v2.x, -1);
    assert.strictEqual(v2.y, 0);
    assert.strictEqual(v2.z, 1);
    assert.strictEqual(v3.x, 0);
    assert.strictEqual(v3.y, 2);
    assert.strictEqual(v3.z, 4);
  });
  it("minus", function() {
    var v1 = new Vec3(1, 2, 3);
    var v2 = new Vec3(-1, 0, 1);
    var v3 = v1.minus(v2);
    assert.strictEqual(v1.x, 1);
    assert.strictEqual(v1.y, 2);
    assert.strictEqual(v1.z, 3);
    assert.strictEqual(v2.x, -1);
    assert.strictEqual(v2.y, 0);
    assert.strictEqual(v2.z, 1);
    assert.strictEqual(v3.x, 2);
    assert.strictEqual(v3.y, 2);
    assert.strictEqual(v3.z, 2);
  });
  it("scaled", function() {
    var v1 = new Vec3(1, 2, 3);
    var v2 = v1.scaled(2);
    assert.strictEqual(v1.x, 1);
    assert.strictEqual(v1.y, 2);
    assert.strictEqual(v1.z, 3);
    assert.strictEqual(v2.x, 2);
    assert.strictEqual(v2.y, 4);
    assert.strictEqual(v2.z, 6);
  });
  it("abs", function() {
    var v1 = new Vec3(1.1, -1.5, 1.9);
    var v2 = v1.abs();
    v1.x = 10;
    assert.strictEqual(v2.x, 1.1);
    assert.strictEqual(v2.y, 1.5);
    assert.strictEqual(v2.z, 1.9);
  });
  it("distanceTo", function() {
    var v1 = new Vec3(1, 1, 1);
    var v2 = new Vec3(2, 2, 2);
    var dist1 = v1.distanceTo(v2);
    var dist2 = v2.distanceTo(v1);
    var expected = 1.7320508075688772;
    assert.strictEqual(dist1, dist2);
    assert.strictEqual(Math.round(dist1 * 100000), Math.round(expected * 100000));
  });
  it("equals", function() {
    var v1 = new Vec3(1, 2, 3);
    var v2 = v1.scaled(0.23424);
    var v3 = v1.scaled(0.23424);
    assert.ok(v2.equals(v3));
  });
  it("toString", function() {
    var v1 = new Vec3(1, -1, 3.14);
    assert.strictEqual(v1.toString(), "(1, -1, 3.14)");
  });
  it("clone", function() {
    var v1 = new Vec3(1, 2, 3);
    var v2 = v1.clone();
    v2.x = 10;
    assert.strictEqual(v1.x, 1);
    assert.strictEqual(v1.y, 2);
    assert.strictEqual(v1.z, 3);
    assert.strictEqual(v2.x, 10);
    assert.strictEqual(v2.y, 2);
    assert.strictEqual(v2.z, 3);
  });
  it("add", function() {
    var v1 = new Vec3(1, 2, 3);
    var v2 = new Vec3(-1, -2, -3);
    var v3 = v1.add(v2);
    assert.strictEqual(v3, v1);
    assert.strictEqual(v1.x, 0);
    assert.strictEqual(v1.y, 0);
    assert.strictEqual(v1.z, 0);
  });
  it("subtract", function() {
    var v1 = new Vec3(1, 2, 3);
    var v2 = new Vec3(-1, -2, -3);
    var v3 = v1.subtract(v2);
    assert.strictEqual(v3, v1);
    assert.strictEqual(v1.x, 2);
    assert.strictEqual(v1.y, 4);
    assert.strictEqual(v1.z, 6);
  });
  it("set", function() {
    var v1 = new Vec3(12, 32, 46);
    var v2 = v1.set(0, 10, 100);
    assert.strictEqual(v1, v2);
    assert.strictEqual(v1.x, 0);
    assert.strictEqual(v1.y, 10);
    assert.strictEqual(v1.z, 100);
  });
  it("modulus", function() {
    var v1 = new Vec3(12, 32, -1);
    var v2 = new Vec3(14, 32, 16);
    var v3 = v1.modulus(v2);
    assert.strictEqual(v1.x, 12);
    assert.strictEqual(v1.y, 32);
    assert.strictEqual(v1.z, -1);
    assert.strictEqual(v2.x, 14);
    assert.strictEqual(v2.y, 32);
    assert.strictEqual(v2.z, 16);
    assert.strictEqual(v3.x, 12);
    assert.strictEqual(v3.y, 0);
    assert.strictEqual(v3.z, 15);
  });
  it("volume", function() {
    var v1 = new Vec3(3, 4, 5);
    assert.strictEqual(v1.volume(), 60);
  });
  it("min", function() {
    var v1 = new Vec3(-1, 0, 1);
    var v2 = new Vec3(10, -10, 1.1);
    var v3 = v1.min(v2);
    assert.strictEqual(v3.x, -1);
    assert.strictEqual(v3.y, -10);
    assert.strictEqual(v3.z, 1);
  });
  it("max", function() {
    var v1 = new Vec3(-1, 0, 1);
    var v2 = new Vec3(10, -10, 1.1);
    var v3 = v1.max(v2);
    assert.strictEqual(v3.x, 10);
    assert.strictEqual(v3.y, 0);
    assert.strictEqual(v3.z, 1.1);
  });
  it("update", function() {
    var v1 = new Vec3(-1, 0, 1);
    var v2 = new Vec3(10, -10, 1.1);
    var v3 = v1.update(v2);
    assert.strictEqual(v3, v1);
    assert.strictEqual(v1.x, 10);
    assert.strictEqual(v1.y, -10);
    assert.strictEqual(v1.z, 1.1);
    assert.strictEqual(v2.x, 10);
    assert.strictEqual(v2.y, -10);
    assert.strictEqual(v2.z, 1.1);
  });
  it("norm", function() {
    var v1 = new Vec3(-10, 0, 10);
    assert.strictEqual(Math.round(v1.norm() * 100000), Math.round(14.142135623730950 * 100000));
  });
  it("unit", function() {
    var v1 = new Vec3(10, -10, 1.1);
    var v2 = v1.unit()
    assert.strictEqual(Math.round(v2.x * 100000), Math.round(0.7049774402016568 * 100000));
    assert.strictEqual(Math.round(v2.y * 100000), Math.round(-0.704977440201656 * 100000));
    assert.strictEqual(Math.round(v2.z * 100000), Math.round(0.07754751842218225 * 100000));
    var v3 = new Vec3(0, 0, 0);
    var v4 = v3.unit()
    assert.strictEqual(v4.x, 0);
    assert.strictEqual(v4.y, 0);
    assert.strictEqual(v4.z, 0);
  });
  it("scale", function() {
    var v1 = new Vec3(10, -10, 1.1);
    var v2 = v1.scale(1.5)
    assert.strictEqual(v2.x, 15);
    assert.strictEqual(v2.y, -15);
    assert.strictEqual(Math.round(v2.z * 100000), Math.round(1.65 * 100000));
  });
  it("xyDistanceTo", function() {
    var v1 = new Vec3(1, 1, 1);
    var v2 = new Vec3(2, 2, 2);
    var dist1 = v1.xyDistanceTo(v2);
    var dist2 = v2.xyDistanceTo(v1);
    var expected = 1.4142135623730950;
    assert.strictEqual(dist1, dist2);
    assert.strictEqual(Math.round(dist1 * 100000), Math.round(expected * 100000));
  });
  it("xzDistanceTo", function() {
    var v1 = new Vec3(1, 1, 1);
    var v2 = new Vec3(2, 2, 2);
    var dist1 = v1.xzDistanceTo(v2);
    var dist2 = v2.xzDistanceTo(v1);
    var expected = 1.4142135623730950;
    assert.strictEqual(dist1, dist2);
    assert.strictEqual(Math.round(dist1 * 100000), Math.round(expected * 100000));
  });
  it("yzDistanceTo", function() {
    var v1 = new Vec3(1, 1, 1);
    var v2 = new Vec3(2, 2, 2);
    var dist1 = v1.yzDistanceTo(v2);
    var dist2 = v2.yzDistanceTo(v1);
    var expected = 1.4142135623730950;
    assert.strictEqual(dist1, dist2);
    assert.strictEqual(Math.round(dist1 * 100000), Math.round(expected * 100000));
  });
  it("innerProduct", function() {
    var v1 = new Vec3(-1, 0, 1);
    var v2 = new Vec3(0, 1, 0);
    var ip1 = v1.innerProduct(v2)
    var ip2 = v2.innerProduct(v1)
    assert.strictEqual(ip1, ip2);
    assert.strictEqual(ip1, 0);
  });
  it("manhattanDistanceTo", function() {
    var v1 = new Vec3(-1, 0, 1);
    var v2 = new Vec3(10, -10, 1.1);
    var dist1 = v1.manhattanDistanceTo(v2);
    var dist2 = v2.manhattanDistanceTo(v1);
    assert.strictEqual(dist1, dist2);
    assert.strictEqual(dist1, 21.1);
  });
  it("toArray", function() {
    var v1 = new Vec3(1, -1, 3.14);
    var array = v1.toArray()
    assert.strictEqual(v1.x, array[0]);
    assert.strictEqual(v1.y, array[1]);
    assert.strictEqual(v1.z, array[2]);
  });
});
