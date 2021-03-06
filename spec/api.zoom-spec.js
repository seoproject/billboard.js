/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("API zoom", function() {
	let chart;
	let args;

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("zoom line chart", () => {

		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				},
				zoom: {
					enabled: true
				}
			};

			expect(true).to.be.ok;
		});

		it("should be zoomed properly", () => {
			const target = [3, 5];

			chart.zoom(target);

			const domain = chart.internal.zoomScale.domain();

			expect(Math.round(domain[0])).to.be.equal(target[0]);
			expect(Math.round(domain[1])).to.be.equal(target[1]);
		});

		it("should be zoomed properly again", () => {
			const target = [1, 4];

			chart.zoom(target);

			const domain = chart.internal.zoomScale.domain();

			expect(Math.round(domain[0])).to.be.equal(target[0]);
			expect(Math.round(domain[1])).to.be.equal(target[1]);
		});

		it("should load timeseries data", () => {
			args = {
				data: {
					x: "date",
					columns: [
						["date", "2014-01-01", "2014-01-02", "2014-08-01", "2014-10-19"],
						["data1", 30, 200, 100, 400]
					]
				},
				axis: {
					x: {
						type: "timeseries"
					}
				},
				zoom: {
					enabled: true
				}
			};

			expect(true).to.be.ok;
		});

		it("should be zoomed properly (new Date)", () => {
			const target = [new Date(2014, 7, 1), new Date(2014, 8, 1)];

			chart.zoom(target);

			const domain = chart.internal.zoomScale.domain();
			expect(domain[0].getFullYear()).to.be.equal(target[0].getFullYear());
			expect(domain[0].getMonth()).to.be.equal(target[0].getMonth());
			expect(domain[0].getDate()).to.be.equal(target[0].getDate());
			expect(domain[1].getFullYear()).to.be.equal(target[1].getFullYear());
			expect(domain[1].getMonth()).to.be.equal(target[1].getMonth());
			expect(domain[1].getDate()).to.be.equal(target[1].getDate());
		});

		it("should be zoomed properly (string)", () => {
			const target = ["2014-08-01", "2014-09-01"];

			chart.zoom(target);

			const domain = chart.internal.zoomScale.domain();
			const targetDate = [chart.internal.parseDate(target[0]), chart.internal.parseDate(target[1])];

			expect(domain[0].getFullYear()).to.be.equal(targetDate[0].getFullYear());
			expect(domain[0].getMonth()).to.be.equal(targetDate[0].getMonth());
			expect(domain[0].getDate()).to.be.equal(targetDate[0].getDate());
			expect(domain[1].getFullYear()).to.be.equal(targetDate[1].getFullYear());
			expect(domain[1].getMonth()).to.be.equal(targetDate[1].getMonth());
			expect(domain[1].getDate()).to.be.equal(targetDate[1].getDate());
		});

	});

	describe("zoom bar chart", () => {

		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					],
					type: "bar"
				},
				zoom: {
					enabled: true
				},
			};

			expect(true).to.be.ok;
		});

		it("should be zoomed properly", (done) => {
			const target = [3, 5];
			const bars = d3.select(".bb-chart-bars").node();
			const orgWidth = bars.getBoundingClientRect().width;
			chart.zoom(target);
			setTimeout(() => {
				expect(bars.getBoundingClientRect().width/orgWidth).to.be.above(2.5);
				done();
			}, 500)
		});
	});


	describe("unzoom", () => {
		it("should load indexed data", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				zoom: {
					enabled: true
				}
			};

			expect(true).to.be.ok;
		});

		it("should be unzoomed properly", () => {
			const target = [1, 4];
			const orginal = chart.internal.x.domain();
			let domain;

			chart.zoom(target);

			domain = chart.internal.zoomScale.domain();

			expect(Math.round(domain[0])).to.be.equal(target[0]);
			expect(Math.round(domain[1])).to.be.equal(target[1]);

			chart.unzoom();

			domain = chart.internal.x.domain();

			expect(domain[0]).to.be.equal(orginal[0]);
			expect(domain[1]).to.be.equal(orginal[1]);
		});
	});
});
