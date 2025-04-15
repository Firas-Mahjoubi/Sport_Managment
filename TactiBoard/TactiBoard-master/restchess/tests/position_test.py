import unittest
import chess
import itertools
from chess import Position

class PositionTest(unittest.TestCase):

    def setUp(self):               
        self.positions = [[Position(row, col) for col in range(8)] for row in range(8)]
        self.flat_positions = set(itertools.chain(*self.positions))
        self.notations = [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1"],
                          ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"],
                          ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3"],
                          ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4"],
                          ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5"],
                          ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6"],
                          ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7"],
                          ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8"]]

    def test_from_notation(self):
        for notation_row, position_row in zip(self.notations, self.positions):
            for notation, position in zip(notation_row, position_row):
                self.assertEqual(position, Position.from_notation(notation))

    def test_str(self):
        for notation_row, position_row in zip(self.notations, self.positions):
            for notation, position in zip(notation_row, position_row):
                self.assertEqual(notation, str(position))

    def test_repr(self):
        for position in self.flat_positions:
            # repr should be a constructor call, so eval should produce an equivalent point
            self.assertEqual(position, eval(repr(position)))

    def test_eq_hash(self):
        for row, position_row in enumerate(self.positions):
            for col, position in enumerate(position_row):
                others = self.flat_positions - {position}
                # test equality
                self.assertEqual(position, Position(row, col))
                self.assertFalse(any(position == other for other in others))
                # test hash
                self.assertIn(position, self.flat_positions)
                self.assertNotIn(position, others)

    def test_iter(self):
        for position in self.flat_positions:
            row, col = position
            self.assertEqual(position.row, row)
            self.assertEqual(position.col, col)

    def test_add(self):
        pass

    def test_pass(self):
        pass

    def test_in_bounds(self):
        self.assertTrue(all(position.in_bounds for position in self.flat_positions))
        self.assertFalse(any(Position(-1, col).in_bounds for col in range(-1, 9)))
        self.assertFalse(any(Position(8, col).in_bounds for col in range(-1, 9)))
        self.assertFalse(any(Position(row, -1).in_bounds for row in range(-1, 9)))
        self.assertFalse(any(Position(row, 8).in_bounds for row in range(-1, 9)))

    def assertPairwiseOffset(self, positions, offset):
        """asserts that every two adjacent elements in the list has a uniform offset """
        def pairwise(iterable):
            """s -> (s0,s1), (s1,s2), (s2, s3), ... """
            iter_a, iter_b = itertools.tee(iterable)
            next(iter_b, None)
            return zip(iter_a, iter_b)

        for prev_position, position in pairwise(positions):
            self.assertEqual(offset, position - prev_position)

    def test_iterator_up(self):
        for position in self.flat_positions:
            up_positions = list(position.iterator_up())
            self.assertEqual(7 - position.row, len(up_positions))
            self.assertTrue(all(up_position.in_bounds for up_position in up_positions))
            self.assertPairwiseOffset([position] + up_positions, (1, 0))

    def test_iterator_down(self):
        for position in self.flat_positions:
            down_positions = list(position.iterator_down())
            self.assertEqual(position.row, len(down_positions))
            self.assertTrue(all(down_position.in_bounds for down_position in down_positions))
            self.assertPairwiseOffset([position] + down_positions, (-1, 0))

    def test_iterator_right(self):
        for position in self.flat_positions:
            right_positions = list(position.iterator_right())
            self.assertEqual(7 - position.col, len(right_positions))
            self.assertTrue(all(right_position.in_bounds for right_position in right_positions))
            self.assertPairwiseOffset([position] + right_positions, (0, 1))

    def test_iterator_left(self):
        for position in self.flat_positions:
            left_positions = list(position.iterator_left())
            self.assertEqual(position.col, len(left_positions))
            self.assertTrue(all(left_position.in_bounds for left_position in left_positions))
            self.assertPairwiseOffset([position] + left_positions, (0, -1))

    def test_iterator_upright(self):
        for position in self.flat_positions:
            upright_positions = list(position.iterator_upright())
            self.assertEqual(min(7 - position.row, 7 - position.col), len(upright_positions))
            self.assertTrue(all(upright_position.in_bounds for upright_position in upright_positions))
            self.assertPairwiseOffset([position] + upright_positions, (1, 1))

    def test_iterator_upleft(self):
        for position in self.flat_positions:
            upleft_positions = list(position.iterator_upleft())
            self.assertEqual(min(7 - position.row, position.col), len(upleft_positions))
            self.assertTrue(all(upleft_position.in_bounds for upleft_position in upleft_positions))
            self.assertPairwiseOffset([position] + upleft_positions, (1, -1))

    def test_iterator_downright(self):
        for position in self.flat_positions:
            downright_positions = list(position.iterator_downright())
            self.assertEqual(min(position.row, 7 - position.col), len(downright_positions))
            self.assertTrue(all(downright_position.in_bounds for downright_position in downright_positions))
            self.assertPairwiseOffset([position] + downright_positions, (-1, 1))

    def test_iterator_downleft(self):
        for position in self.flat_positions:
            downleft_positions = list(position.iterator_downleft())
            self.assertEqual(min(position.row, position.col), len(downleft_positions))
            self.assertTrue(all(downleft_position.in_bounds for downleft_position in downleft_positions))
            self.assertPairwiseOffset([position] + downleft_positions, (-1, -1))

if __name__ == '__main__':
    unittest.main()
